from django.shortcuts import render, redirect

def home(request):
    if request.user.is_authenticated:
        return redirect('all-projects')

    return render(request, 'chartapp/home.html')

def tryout(request):
    if request.user.is_authenticated:
        return redirect('all-projects')

    return render(request, 'chartapp/chart_demo.html')
