import pandas as pd
import numpy as np
import random
import string
import names
from datetime import date, timedelta

random.seed(4)
descriptions = [
    "Design homepage layout",
    "Implement responsive navigation menu",
    "Create login page UI",
    "Develop user authentication system",
    "Integrate OAuth for social login",
    "Set up database schema",
    "Implement user registration functionality",
    "Create user profile page",
    "Design landing page for marketing campaign",
    "Develop search functionality",
    "Implement pagination for search results",
    "Configure server environment (e.g., Apache, Nginx)",
    "Set up HTTPS for secure communication",
    "Create email verification system",
    "Implement forgot password functionality",
    "Develop admin dashboard UI",
    "Implement role-based access control (RBAC)",
    "Create CMS for content management",
    "Set up CI/CD pipeline",
    "Implement automated testing (unit, integration, e2e)",
    "Optimize website performance (minification, caching)",
    "Implement SEO best practices",
    "Set up Google Analytics integration",
    "Develop custom analytics dashboard",
    "Design and implement email templates",
    "Set up newsletter subscription feature",
    "Implement payment gateway integration",
    "Develop e-commerce functionality (product listings, cart, checkout)",
    "Create API endpoints for mobile app integration",
    "Design and implement user feedback system",
    "Set up error logging and monitoring",
    "Develop push notification system",
    "Implement multi-language support",
    "Design and implement user permissions system",
    "Develop interactive data visualization components",
    "Set up geolocation services",
    "Implement real-time chat functionality",
    "Create event registration system",
    "Develop ticketing system",
    "Design and implement blog section",
    "Set up RSS feed for blog posts",
    "Implement file upload functionality",
    "Create custom 404 error page",
    "Set up staging environment for testing",
    "Develop automated deployment scripts",
    "Implement SSO (Single Sign-On) functionality",
    "Design and implement user surveys",
    "Set up A/B testing framework",
    "Develop recommendation engine",
    "Design and implement gamification features",
    "Implement social sharing functionality",
    "Create user forums",
    "Develop user-generated content moderation tools",
    "Set up firewall and security measures",
    "Implement two-factor authentication (2FA)",
    "Design and implement user onboarding process",
    "Develop integration with third-party APIs (e.g., Google Maps, PayPal)",
    "Set up DNS configuration",
    "Implement geofencing features",
    "Create user notification system",
    "Develop content scheduling feature",
    "Design and implement user progress tracking",
    "Set up affiliate marketing integration",
    "Implement content personalization",
    "Develop data backup and recovery mechanisms",
    "Set up user support ticketing system",
    "Implement user account deactivation process",
    "Create user-generated content sharing platform",
    "Develop virtual event platform",
    "Design and implement interactive quizzes",
    "Set up user activity logging",
    "Implement content moderation tools",
    "Develop user subscription management system",
    "Design and implement surveys and polls",
    "Set up email marketing automation",
    "Implement integration with CRM system",
    "Develop content import/export functionality",
    "Design and implement user rewards program",
    "Set up server monitoring and alerts",
    "Implement custom reporting features",
    "Develop user progress dashboards",
    "Design and implement online learning platform",
    "Set up content delivery network (CDN)",
    "Implement image and video processing features",
    "Create custom data visualization dashboards",
    "Develop integration with social media platforms",
    "Design and implement user engagement analytics",
    "Set up customer support chatbot",
    "Implement product recommendation engine",
    "Develop integration with e-commerce platforms",
    "Design and implement interactive maps",
    "Set up user account migration tools",
    "Implement event scheduling and RSVP features",
    "Develop custom survey creation tools",
    "Design and implement leaderboard functionality",
    "Set up user data anonymization tools",
    "Implement integration with marketing automation platforms",
    "Develop integration with HR management systems",
    "Design and implement community forums moderation tools",
    "Set up data encryption and security measures"
]

def users():
    num_of_users = 500
    users = []

    for i in range(num_of_users):

        # create user_id
        user_id = i + 1

        # create username
        username = names.get_first_name() + str(user_id)

        # create password
        password = "".join(random.choices(string.ascii_lowercase + string.digits, k=4))

        # create role
        role = random.choices(["manager", "member"], weights = [20, 80], k=1)[0]

        # add info to list of tasks
        users.append([user_id, username, password, role])

    return pd.DataFrame(users, columns = ["user_id", "username", "password", "role"])

def tasks():
    num_of_tasks = 4000
    tasks = []
    date_1, date_2 = date(2024, 2, 13), date(2024, 2, 29)
    interval = date_2 - date_1
    interval_days = interval.days

    # Dictionary to keep track of projects and whether they have at least one task
    projects_with_task = {}

    # Create at least one task for each project
    for project_id in range(1, 1001):
        user_id = random.randint(1, 500)
        status = random.choice(["complete", "incomplete"])
        estimated_duration = random.randint(1, 8)
        due_date = str(date_1 + timedelta(days=random.randint(1, interval_days)))
        description = random.choice(descriptions)
        tasks.append([len(tasks) + 1, project_id, user_id, status, estimated_duration, due_date, description])
        projects_with_task[project_id] = True

    # Create additional tasks for the remaining iterations
    for i in range(num_of_tasks - 1000):
        project_id = random.randint(1, 1000)
        if project_id not in projects_with_task:
            user_id = random.randint(1, 500)
            status = random.choice(["complete", "incomplete"])
            estimated_duration = random.randint(1, 8)
            due_date = str(date_1 + timedelta(days=random.randint(1, interval_days)))
            description = random.choice(descriptions)
            tasks.append([len(tasks) + 1, project_id, user_id, status, estimated_duration, due_date, description])
            projects_with_task[project_id] = True
        else:
            user_id = random.randint(1, 500)
            status = random.choice(["complete", "incomplete"])
            estimated_duration = random.randint(1, 8)
            due_date = str(date_1 + timedelta(days=random.randint(1, interval_days)))
            description = random.choice(descriptions)
            tasks.append([len(tasks) + 1, project_id, user_id, status, estimated_duration, due_date, description])

    return pd.DataFrame(tasks, columns = ["task_id", "project_id", "user_id", "status", "estimated_duration", "due_date", "description"])

def projects():
    num_of_projects = 1000
    team_size_pool = tasks_df.groupby("project_id").nunique().reset_index()["user_id"]
    completion_time_pool = np.ceil((tasks_df[["project_id", "estimated_duration"]].groupby("project_id").sum().reset_index()["estimated_duration"])/8)
    projects = []

    for i in range(num_of_projects):

        # create project_id
        project_id = i + 1

        # create project_name
        project_name = names.get_last_name()

        # create team_size
        team_size = team_size_pool[i]

        # create budget ($)
        budget = random.randint(1,100) * 1000 + team_size * 10000

        # create workload
        if completion_time_pool[i] == 1:
            workload = "S"
        elif 2 <= completion_time_pool[i] <= 3:
            workload = "M"
        else:
            workload = "L"

        # create completion_time (days)
        completion_time = completion_time_pool[i]

        # add info to list of projects
        projects.append([project_id, project_name, team_size, budget, workload, completion_time])

    return pd.DataFrame(projects, columns = ["project_id", "project_name", "team_size", "budget", "workload", "completion_time"])

if __name__ == "__main__":

    users_df = users()
    tasks_df = tasks()
    projects_df = projects()

    projects_df.to_json('./data/projects.json', orient='records')
    tasks_df.to_json('./data/tasks.json', orient='records')
    users_df.to_json('./data/users.json', orient='records')

    projects_df.to_csv('./data/projects.csv', index = False)
    tasks_df.to_csv('./data/tasks.csv', index = False)
    users_df.to_csv('./data/users.csv', index = False)
