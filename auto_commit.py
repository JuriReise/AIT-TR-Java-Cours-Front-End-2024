import os
from datetime import datetime

# Получаем текущую дату и время
current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
commit_message = f"Commit: {current_time}"

# Выполняем команды Git
os.system("git add .")
os.system(f'git commit -m "{commit_message}"')
os.system("git push origin main")
