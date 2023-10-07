from django.urls import path, include
from music_space_api.views import (
    RoomView,
    CreateRoomView,
    UpdateRoomView,
    GetRoomView,
    JoinRoomView,
    UserInRoomView,
    LeaveRoomView,
)

urlpatterns = [
    path("room", RoomView.as_view()),
    path("create-room", CreateRoomView.as_view()),
    path("update-room", UpdateRoomView.as_view()),
    path("get-room", GetRoomView.as_view()),
    path("join-room", JoinRoomView.as_view()),
    path("user-in-room", UserInRoomView.as_view()),
    path("leave-room", LeaveRoomView.as_view()),
]
