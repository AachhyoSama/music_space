from django.urls import path, include
from music_space_api.views import RoomView

urlpatterns = [
    path("room", RoomView.as_view()),
]
