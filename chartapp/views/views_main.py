from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, DetailView
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from chartapp.models import Project, Chart
import json

class ProjectListView(LoginRequiredMixin, ListView):
    def get_queryset(self):
        return Project.objects.filter(creator=self.request.user)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        qs = Project.objects.filter(creator=self.request.user)
        context['json_object_list'] = serializers.serialize('json', qs)
        return context

class ChartListView(LoginRequiredMixin, ListView):
    def get_queryset(self):
        return Chart.objects.filter(parentproject=self.kwargs['pk'])

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        qs = Chart.objects.filter(parentproject=self.kwargs['pk'])
        context['json_object_list'] = serializers.serialize('json', qs)
        context['project_name'] = get_object_or_404(Project, id=self.kwargs['pk'])
        return context

class ChartDetailView(LoginRequiredMixin, DetailView):
    model = Chart

def control_view(request):
    data_from_post = json.load(request)['post_data']

    if 'name' in data_from_post:
        new_project = Project.objects.create(name=data_from_post['name'], creator=request.user)
        new_project.save()

    elif 'delete' in data_from_post:
        Project.objects.filter(id=int(data_from_post['delete'])).delete()

    elif 'update' in data_from_post:
        Project.objects.filter(id=int(data_from_post['update'])).update(name=data_from_post['rename'])

    data = serializers.serialize('json', Project.objects.filter(creator=request.user))

    return HttpResponse(data)

def chart_control_view(request):
    data_from_post = json.load(request)['post_data']

    if 'name' in data_from_post:
        project_id = Project.objects.get(id=int(data_from_post['project']))
        new_chart = Chart.objects.create(name=data_from_post['name'], parentproject=project_id)
        new_chart.save()

    elif 'delete' in data_from_post:
        Chart.objects.filter(id=int(data_from_post['delete'])).delete()

    elif 'update' in data_from_post:
        Chart.objects.filter(id=int(data_from_post['update'])).update(name=data_from_post['rename'])

    data = serializers.serialize('json', Chart.objects.filter(parentproject=data_from_post['project']))

    return HttpResponse(data)

def chart_update_view(request):
    data_from_post = json.load(request)['post_data']

    ctx = Chart.objects.filter(id=int(data_from_post['id']))
    ctx.update(
        label=data_from_post['label'],
        inner_labels=data_from_post['array1'],
        data_list=data_from_post['array2'],
        color=data_from_post['array3'],
        type=data_from_post['type']
    )
    return JsonResponse({'job': 'done'})
