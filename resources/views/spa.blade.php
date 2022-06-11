@php
$config = [
    'appName' => config('app.name'),
    'locale' => $locale = app()->getLocale(),
    'locales' => config('app.locales'),
    'githubAuth' => config('services.github.client_id'),
];
@endphp
<!DOCTYPE html>
<html lang="fa">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <title>{{ config('app.name') }}</title>

  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
  <div id="app"></div>
  <script>
    window.config = @json($config);
  </script>
<script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>
