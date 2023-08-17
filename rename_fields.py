import os

def capitalize(word):
    return word[0].upper() + word[1:]

def snake_to_camel(snake):
    words = snake.split('_')
    return ''.join([words[0], *[capitalize(word) for word in words[1:]]])

BASE_DIR = os.path.join(os.getcwd(), 'src', 'api-client')
SEARCH_DIRS = [
    os.path.join(BASE_DIR, 'apis'),
    os.path.join(BASE_DIR, 'models'),
]
SNAKE_RENAME_FIELDS = [
    'start_time',
    'end_time',
    'created_at',
    'updated_at',

    'typical_percentage',
    'typical_monthly_amount',
    'category_relations',

    'total_amount',
    'is_percentage',

    'first_name', 
    'last_name'
]

CAMEL_RENAME_FIELDS = [
    snake_to_camel(field) for field in SNAKE_RENAME_FIELDS
]


def rename_fields():
    for dir in SEARCH_DIRS:
        for file in os.listdir(dir):
            absolute_path = os.path.join(dir, file)
            lines = []
            with open(absolute_path, 'r') as input_file:
                for line in input_file.readlines():
                    for snake_field, camel_field in zip(SNAKE_RENAME_FIELDS, CAMEL_RENAME_FIELDS):
                        line = line.replace(camel_field, snake_field)
                    lines.append(line)
            with open(absolute_path, 'w') as output_file:
                output_file.writelines(lines)

if __name__ == '__main__':
    rename_fields()
