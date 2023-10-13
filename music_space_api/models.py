from django.db import models
import string
import random


# Generate a unique code for updating in database
def generate_unique_code():
    length_of_code = 6

    while True:
        code = "".join(random.choices(string.ascii_uppercase, k=length_of_code))

        if (
            Room.objects.filter(code=code).count() == 0
        ):  # Check if the code already exists
            break

    return code


# Create your models here.
class Room(models.Model):  # Defines the room for the music
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    current_song = models.CharField(max_length=50, null=True)
