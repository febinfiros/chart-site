from django.contrib.auth.decorators import login_required
from .forms import UserRegistrationForm, UserUpdateForm, UserDeleteForm
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from chartapp.models import Project, Chart

def signup(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)

        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            email = form.cleaned_data.get('email')

            user = authenticate(username=username, password=password, email=email)
            login(request, user)
            return redirect('all-projects')
    else:
        form = UserRegistrationForm()
    return render(request, 'user/signup.html', {'form': form})

@login_required
def profile_view(request):
    if request.method == 'POST':
        form = UserUpdateForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('profile')
    else:
        form = UserUpdateForm(instance=request.user)

    total_projects = Project.objects.filter(creator=request.user)
    total_charts = 0

    for project in total_projects:
        charts = Chart.objects.filter(parentproject=project.id).count()
        total_charts += charts

    context = {
        'projects': total_projects.count(),
        'chart': total_charts,
        'form': form
    }

    return render(request, 'user/profile.html', context)

@login_required
def delete_profile(request):
    if request.method == 'POST':
        delete_form = UserDeleteForm(request.POST, instance=request.user)
        user = request.user
        user.delete()

        return redirect('signup')

    else:
        delete_form = UserDeleteForm(instance=request.user)

    context = {'form': delete_form}
    return render(request, 'user/delete_profile.html', context )
