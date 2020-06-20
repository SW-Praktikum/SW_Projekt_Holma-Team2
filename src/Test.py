from datetime import datetime

ts = "2007-03-04T21:08:12.123Z"
iso = datetime.now().isoformat()
ts2 = datetime.strptime(ts, "%Y-%m-%dT%H:%M:%S.%fZ")
ts3 = datetime.strftime(ts2, "%Y-%m-%dT%H:%M:%S.%fZ")
print(iso, ts2, ts3)