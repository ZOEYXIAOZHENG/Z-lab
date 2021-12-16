import pickle
import sys
import face_recognition
import json

# zlab_encodings = pickle.loads(
#     open("./zlab_picture_encoding.pickle", 'rb').read())
zlab_encodings = pickle.loads(open("/Users/zoey/Spiced/Z-lab/server/zlab_picture_encoding.pickle", 'rb').read())
zlab_encodings = zlab_encodings[list(
    zlab_encodings['enc'].map(lambda x: len(x) != 0))]
# image = face_recognition.load_image_file(
#     "/Users/zoey/Spiced/Z-lab/server/uploads/oL2PiKqSM8tI6o_tAekT2uMeErrteZVb.jpg"
# )
image = face_recognition.load_image_file(sys.argv[1])

encodings = face_recognition.face_encodings(image)
zlab_encodings['dis'] = zlab_encodings['enc'].map(
    lambda x: face_recognition.face_distance(encodings, x[0])[0])
zlab_encodings['rank'] = zlab_encodings.groupby(
    by=['agency_url'])['dis'].transform(lambda x: x.rank())

res = zlab_encodings[zlab_encodings['rank'] == 1].sort_values('dis').iloc[:3][[
    'local_path', 'agency_url'
]]
resp = {'match_pictures': list(res['local_path']), 'agency_url': list(res['agency_url'])}
#print(res)
#sys.stdout.flush()
# json.dumps(dictionary, indent = 4) 
print(json.dumps(resp))