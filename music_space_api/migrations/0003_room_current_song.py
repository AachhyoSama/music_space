# Generated by Django 4.2.4 on 2023-10-13 20:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("music_space_api", "0002_alter_room_code"),
    ]

    operations = [
        migrations.AddField(
            model_name="room",
            name="current_song",
            field=models.CharField(max_length=50, null=True),
        ),
    ]
