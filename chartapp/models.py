from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    name = models.CharField(max_length=100, default='New project')
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Chart(models.Model):
    chart_types = [
        ('bar', 'Bar Graph'),
        ('line', 'Line Graph'),
        ('pie', 'Pie Chart'),
        ('doughnut', 'Doughnut Chart')
    ]

    parentproject = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default='New chart')
    label = models.CharField(max_length=100, default='-')
    inner_labels = models.TextField(blank=True)
    data_list = models.TextField(blank=True)
    color = models.TextField(blank=True)
    type = models.CharField(max_length=40, choices=chart_types, default='bar')

    def __str__(self):
        return self.name
