from django.db import models
from django.contrib.auth.models import User
from profiles.models import Profile 

LESSON_CHOICES = [
    ('Maths', 'Maths'),
    ('Science', 'Science'),
    ('History', 'History'),
    
]


class Assignment(models.Model):
    """
    Post model, related to 'owner', i.e. a User instance.
    Default image set so that we can always reference image.url.
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    course = models.CharField(
        max_length=20, choices=LESSON_CHOICES, default='Maths'
    )
    estimated_time = models.DurationField(
        blank=True,
        null=True,
        help_text='Estimated time for the lesson (in hours:minutes:seconds)'
    )
    due_date = models.DateTimeField()
    attachments = models.FileField(upload_to='assignments/')
    assigned_to = models.ManyToManyField(Profile, related_name='assignments')
   
   

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
