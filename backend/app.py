from fastapi import FastAPI, WebSocket
from analyzer import analyze_sms, scan_url
from db import init_db, save_event, get_recent_events
import uvicorn


app = FastAPI()
init_db()


clients = []


@app.post("/scan/sms")
async def scan_sms(payload: dict):
message = payload.get("message")
result = analyze_sms(message)
if result["flag"]:
save_event(result)
for ws in clients:
await ws.send_json({"type":"alert","event":result})
return {"ok": True, "analysis": result}


@app.post("/scan/url")
async def scan_link(payload: dict):
url = payload.get("url")
result = scan_url(url)
if result["flagged"]:
save_event({"type":"url","url":url,"patterns":result["patterns"],"severity":5})
for ws in clients:
await ws.send_json({"type":"alert","event":result})
return {"ok": True, "analysis": result}


@app.websocket("/ws/alerts")
async def websocket_alerts(ws: WebSocket):
await ws.accept()
clients.append(ws)
try:
while True:
await ws.receive_text()
except:
clients.remove(ws)


@app.get("/events")
async def events():
return await get_recent_events()


if __name__=="__main__":
uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)