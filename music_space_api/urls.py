from django.urls import path, include
from music_space_api.views import RoomView, CreateRoomView, GetRoomView, JoinRoomView

urlpatterns = [
    path("room", RoomView.as_view()),
    path("create-room", CreateRoomView.as_view()),
    path("get-room", GetRoomView.as_view()),
    path("join-room", JoinRoomView.as_view()),
]
