import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
import yt_dlp
from youtube_transcript_api import YouTubeTranscriptApi

HISTORY_FILE = "scripts/processed_youtube_videos.json"

def load_processed_ids():
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except:
            return []
    return []

def save_processed_id(video_id):
    history = load_processed_ids()
    if video_id not in history:
        history.append(video_id)
        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump(history, f, ensure_ascii=False, indent=2)

def search_top_video(topic="focus", max_candidates=10):
    """
    Search top engaged videos on YouTube by topic.
    Topic: 'focus' (Tập trung) or 'habit' (Thói quen)
    """
    queries = {
        "focus": [
            "cách tập trung làm việc deep work",
            "khả năng tập trung cao độ não bộ",
            "trị sương mù não mất tập trung",
            "phương pháp deep work tập trung sâu"
        ],
        "habit": [
            "xây dựng thói quen nguyên tử atomic habits",
            "kỷ luật không cần gồng kaizen",
            "vượt qua trì hoãn tâm lý học",
            "thói quen nhỏ thay đổi cuộc đời"
        ]
    }
    
    selected_queries = queries.get(topic, queries["focus"])
    processed_ids = load_processed_ids()
    
    candidates = []
    ydl_opts = {
        'quiet': True,
        'extract_flat': True,
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        for q in selected_queries:
            try:
                res = ydl.extract_info(f"ytsearch5:{q}", download=False)
                for entry in res.get("entries", []):
                    vid = entry.get("id")
                    if vid and vid not in processed_ids and vid not in [c["id"] for c in candidates]:
                        candidates.append({
                            "id": vid,
                            "title": entry.get("title"),
                            "views": entry.get("view_count") or 0,
                            "channel": entry.get("channel"),
                            "url": f"https://www.youtube.com/watch?v={vid}",
                            "query": q
                        })
            except Exception as e:
                print(f"Query '{q}' err:", e)
                
    # Sort candidates by view count descending
    candidates.sort(key=lambda x: x["views"] if isinstance(x["views"], int) else 0, reverse=True)
    return candidates

def fetch_video_transcript(video_id):
    """
    Fetch Vietnamese or English transcript of a YouTube video.
    """
    try:
        api = YouTubeTranscriptApi()
        transcripts = api.list(video_id)
        # Prioritize Vietnamese, then English
        t = None
        try:
            t = transcripts.find_transcript(['vi'])
        except:
            try:
                t = transcripts.find_transcript(['en'])
            except:
                # Get the first available
                for tr in transcripts:
                    t = tr
                    break
        if t:
            fetched = t.fetch()
            full_text = " ".join([seg.text for seg in fetched])
            return full_text
    except Exception as e:
        print(f"Transcript fetch note for {video_id}:", e)
    return ""

def get_best_video_content(topic="focus"):
    """
    Picks the #1 top candidate video and returns its metadata + full transcript.
    """
    candidates = search_top_video(topic=topic)
    if not candidates:
        print(f"No new candidates found for topic: {topic}")
        return None
        
    for cand in candidates:
        transcript = fetch_video_transcript(cand["id"])
        if transcript and len(transcript) > 300:
            cand["transcript"] = transcript
            print(f"Selected Video: '{cand['title']}' ({cand['views']} views, Channel: {cand['channel']})")
            print(f"Transcript length: {len(transcript)} characters")
            return cand
            
    # Fallback to the top candidate even without transcript
    top = candidates[0]
    top["transcript"] = ""
    print(f"Selected Top Video (no transcript): '{top['title']}'")
    return top

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic", default="focus", choices=["focus", "habit"])
    args = parser.parse_args()
    
    print(f"--- Mining YouTube Content for Topic: {args.topic} ---")
    data = get_best_video_content(args.topic)
    if data:
        print("Success! Extracted candidate:")
        print("Title:", data["title"])
        print("Views:", data["views"])
        print("URL:", data["url"])
