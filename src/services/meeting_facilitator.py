# meeting_facilitator.py

import time
from flask import Flask, request, jsonify

app = Flask(__name__)

class MeetingFacilitator:
    """
    This class encapsulates the logic for analyzing meeting transcripts and generating prompts.
    
    The analysis is simple and rule-based:
      - The transcript is scanned for keywords defined in the meeting's agenda.
      - A ratio is computed (agenda keyword count / total words).
      - Depending on the configured intervention level, a threshold is used to decide if the transcript is off-topic.
    
    The intervention level can be:
      - "minimal": very low interference (prompt if ratio < 0.05)
      - "moderate": default (prompt if ratio < 0.10)
      - "active": high intervention (prompt if ratio < 0.15)
    """
    def __init__(self, agenda_keywords=None, intervention_level="moderate"):
        if agenda_keywords is None:
            # Default agenda keywords; modify or extend as needed
            agenda_keywords = ["project", "deadline", "deliverable", "update", "plan", "strategy", "budget"]
        self.agenda_keywords = agenda_keywords
        self.intervention_level = intervention_level

    def set_intervention_level(self, level):
        """
        Set the intervention level to control how aggressively the facilitator intervenes.
        """
        self.intervention_level = level

    def analyze_transcript(self, transcript):
        """
        Analyze the transcript by counting occurrences of agenda keywords versus total words.
        Returns a dictionary with the computed ratio and whether the transcript is considered off-topic.
        """
        transcript_lower = transcript.lower()
        keyword_count = sum(transcript_lower.count(keyword) for keyword in self.agenda_keywords)
        total_words = len(transcript_lower.split())
        ratio = keyword_count / total_words if total_words > 0 else 0

        # Define thresholds based on intervention level
        if self.intervention_level == "minimal":
            threshold = 0.05
        elif self.intervention_level == "active":
            threshold = 0.15
        else:  # moderate
            threshold = 0.10

        is_off_topic = ratio < threshold

        analysis = {
            "keyword_count": keyword_count,
            "total_words": total_words,
            "ratio": round(ratio, 3),
            "is_off_topic": is_off_topic,
            "threshold": threshold
        }
        return analysis

    def generate_prompt(self, transcript):
        """
        Generate a facilitation prompt based on the transcript analysis.
        If the transcript appears off-topic, a refocusing prompt is returned.
        Otherwise, an affirmation message is provided.
        """
        analysis = self.analyze_transcript(transcript)
        if analysis["is_off_topic"]:
            prompt = (
                f"It appears the discussion may be drifting off-topic. "
                f"Let's refocus on our agenda: {', '.join(self.agenda_keywords)}."
            )
        else:
            prompt = "The discussion is on track."
        return prompt, analysis

# Create a global facilitator instance.
facilitator = MeetingFacilitator()

@app.route('/transcript', methods=['POST'])
def transcript():
    """
    Endpoint to receive transcript chunks.
    
    Expected JSON payload:
    {
        "transcript": "The transcribed text...",
        "intervention_level": "moderate"  // optional; could be "minimal" or "active"
    }
    """
    data = request.json
    transcript_text = data.get("transcript", "")
    intervention_level = data.get("intervention_level")
    if intervention_level:
        facilitator.set_intervention_level(intervention_level)
    
    prompt, analysis = facilitator.generate_prompt(transcript_text)
    response = {
        "prompt": prompt,
        "analysis": analysis
    }
    return jsonify(response)

@app.route('/simulate', methods=['GET'])
def simulate():
    """
    Endpoint for testing purposes.
    
    It simulates a series of transcript chunks. In a real scenario, the transcript
    would be streamed in real time.
    """
    sample_transcripts = [
        # On-topic transcript
        "Today we are discussing the project deadline and deliverable milestones. "
        "The plan is clear and the update is on track.",
        
        # Off-topic transcript
        "I think that the weather is nice and we should consider taking a break. "
        "Also, did you watch the game last night?",
        
        # Mixed transcript
        "Let's focus on the strategy, budget, and deliverable timeline. "
        "However, I also want to mention that I had a great weekend."
    ]
    results = []
    for transcript_text in sample_transcripts:
        prompt, analysis = facilitator.generate_prompt(transcript_text)
        results.append({
            "transcript": transcript_text,
            "prompt": prompt,
            "analysis": analysis
        })
        # Simulate delay for real-time processing
        time.sleep(1)
    return jsonify(results)

if __name__ == '__main__':
    # Run the Flask development server
    app.run(debug=True, port=5000)