from django.db import models
from django.contrib.auth.models import User

class Lesson(models.Model):
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to='lesson_images/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)
    course = models.ForeignKey(
        max_length=20, choices=LESSON_CHOICES, default='Maths'
    )
    difficulty_level = models.CharField(
        max_length=20, choices=DIFFICULTY_LEVEL_CHOICES, default='Beginner'
    )
   
   

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title 
