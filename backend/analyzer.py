import re


SMS_PATTERNS = ["win \$\d+", "click here", "verify your account", "free gift"]
URL_PATTERNS = [r"login\.php", r"update.*password", r"free.*gift"]


def analyze_sms(message: str) -> dict:
flagged = any(re.search(p, message.lower()) for p in SMS_PATTERNS)
severity = 5 if flagged else 0
return {"message": message, "flag": flagged, "severity": severity, "type":"sms"}


def scan_url(url: str) -> dict:
patterns = [p for p in URL_PATTERNS if re.search(p, url.lower())]
return {"url": url, "flagged": bool(patterns), "patterns": patterns}