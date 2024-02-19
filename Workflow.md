# Проект Guitar-Shop

Проект состоит из двух сервисов: frontend и backend

## Установка окружения

#### Бэкенд

```bash
cd /backend
npm install
```

Переменные окружения:

```bash
PORT=number - порт для входящих подключений к серверу
SALT=string - соль для хеширования пароля
DB_HOST=string - адресс для подключения к БД
DB_USER=string - имя пользователя для подключения к БД
DB_PASSWORD=string - пароль для подключения к БД
DB_PORT=string - порт для подключения к БД
DB_NAME=string - имя БД
UPLOAD_DIRECTORY=string - дирректория для загрузки статики
JWT_SECRET=string - соль для создания токена
HOST=string - хост
```
Пример в файле .env-example

#### Фронтенд

```bash
cd /frontend
npm install
```

## Команды запуска

#### Бэкенд

```bash
docker compose up -d
```

```bash
npm start
```
#### Фронтенд

```bash
npm start
```


## Остальные команды

Команда запуска тестового сервера:

```bash
npm run mock:server
```

Команда генерации 30 тестовых данных в файл **.tsv**.

```bash
npm run cli -- --generate 30 ./mock/mock-data.tsv http://localhost:3123/api

```

Команда импорта тестовых данных из файла **.tsv** в БД.

```bash
npm run cli -- --import ./mock/mock-data.tsv db_user db_password localhost db_name _salt

```

#### Запустить cli команды

```bash
npm run cli -- --<commandName> [--arguments]
```
Вызовет cli команду c с переданными аргументами Подробнее о доступные командах: npm run cli -- --help


#### Скомпилировать проект

```bash
npm run compile
```

Создаст директорию `dist` и скомпилирует проект.

#### Удалить скомпилированный проект

```bash
npm run clean
```

Удаляет директорию `dist`. Используется перед компиляцией.

#### Собрать проект

```bash
npm run build
```

Выполняет сборку проекта: удаляет ранее скомпилированный проект и компилирует заново.

#### Проверить линтером

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Линтер проверяет файлы только внутри директории `src`.

