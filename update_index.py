
import os

# Путь к корневой директории проекта
ROOT_DIR = os.path.dirname(os.path.abspath(os.path.join(os.getcwd(), 'AIT-TR-Java-Cours-Front-End-2024')))
INDEX_FILE = os.path.join(ROOT_DIR, "index.html")

def build_structure(base_path):
    structure = {}
    for root, dirs, files in os.walk(base_path):
        if "Lesson_" in os.path.basename(root):
            lesson_name = os.path.basename(root)
            structure[lesson_name] = {}
            for sub_dir in dirs:
                sub_dir_path = os.path.join(root, sub_dir)
                if os.path.isdir(sub_dir_path):
                    html_files = [
                        os.path.relpath(os.path.join(sub_dir_path, file), base_path)
                        for file in os.listdir(sub_dir_path)
                        if file.endswith(".html")
                    ]
                    if html_files:
                        structure[lesson_name][sub_dir] = html_files
    return structure

def generate_index_html(structure):
    html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AIT-TR-Java-Cours-Front-End-2024</title>
    <link rel="stylesheet" href="./styles.css">
</head>
<body>
    <header class="gradient-header">
        <h1>AIT-TR-Java-Cours-Front-End-2024</h1>
    </header>
    <div class="container">
        <div class="gallery">
'''
    for lesson, contents in structure.items():
        html_content += f'''
            <div class="card">
                <h2>{lesson}</h2>
'''
        for sub_dir, files in contents.items():
            for file in files:
                html_content += f'''
                <p><a href="./{file}">{sub_dir} - {os.path.basename(file)}</a></p>
                '''
        html_content += '''
            </div>
        '''
    html_content += '''
        </div>
    </div>
    <footer>
        <p>&copy; 2024 Все права защищены</p>
    </footer>
</body>
</html>
'''
    return html_content

if __name__ == "__main__":
    lesson_structure = build_structure(ROOT_DIR)
    index_html_content = generate_index_html(lesson_structure)
    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        f.write(index_html_content)
    print("Главный index.html успешно обновлен.")
