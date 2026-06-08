"""Speech to Text"""


from faster_whisper import WhisperModel

# LOAD MODEL
model = WhisperModel(
    "tiny",
    device="cpu",
    compute_type="int8"
)


def transcribe_audio(audio_path):

    segments, info = model.transcribe(audio_path)

    text = ""

    for segment in segments:
        text += segment.text

    return text.strip()
