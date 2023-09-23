from django.db import models
from django.contrib.auth.models import User
from profiles.models import Profile 

LESSON_CHOICES = [
    ('Maths', 'Maths'),
    ('Science', 'Science'),
    ('History', 'History'),
    
]

CLASS = [
    ('Barry', 'Barry'),
    ('John', 'Sarah'),
    ('Rachel', 'Rachel'),
    ('Sue', 'Sue'),
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
    image = models.ImageField(upload_to='lesson_images/', blank=True, null=True)
    course = models.CharField(
        max_length=20, choices=LESSON_CHOICES, default='Maths'
    )
    estimated_time = models.DurationField(
        blank=True,
        null=True,
        help_text='Estimated time for the lesson (in hours:minutes:seconds)'
    )
    due_date = models.DateTimeField()
   
    assigned = models.CharField(
        max_length=20, choices=CLASS, default='Sue')
   
   

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
