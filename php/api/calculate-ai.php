<?php
/**
 * HesapKutu - PHP Gemini API Doğal Dil Hesaplama Endpoint
 */
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Sadece POST istekleri kabul edilir.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$query = trim($input['query'] ?? '');

if (empty($query)) {
    http_response_code(400);
    echo json_encode(['error' => 'Sorgu metni gereklidir.']);
    exit;
}

if (empty(GEMINI_API_KEY) || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    http_response_code(500);
    echo json_encode(['error' => 'Sunucuda GEMINI_API_KEY tanımlanmamış.']);
    exit;
}

$prompt = "Sen Türkiye'nin popüler hesaplama platformu HesapKutu'nun yapay zekâ matematik ve finans asistanısın.
Kullanıcının Türkçe doğal dilde sorduğu problemi adım adım çöz.
Kullanıcı Sorusu: \"{$query}\"

Lütfen yanıtını SADECE geçerli bir JSON formatında döndür.
JSON formatı:
{
  \"summaryTitle\": \"Hesaplanan konunun kısa başlığı\",
  \"finalAnswer\": \"Nihai net sonuç (sayı ve birim)\",
  \"steps\": [\"Adım 1: ...\", \"Adım 2: ...\"],
  \"formulaUsed\": \"Kullanılan formül\",
  \"relatedToolSlug\": \"yuzde-hesaplama veya kdv-hesaplama vb.\"
}";

$endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" . GEMINI_API_KEY;

$payload = [
    'contents' => [
        [
            'parts' => [
                ['text' => $prompt]
            ]
        ]
    ],
    'generationConfig' => [
        'responseMimeType' => 'application/json'
    ]
];

$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_TIMEOUT, 20);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code !== 200 || !$response) {
    http_response_code(500);
    echo json_encode(['error' => 'Gemini API ile iletişim kurulamadı.']);
    exit;
}

$api_data = json_decode($response, true);
$raw_text = $api_data['candidates'][0]['content']['parts'][0]['text'] ?? '{}';

// JSON Parse
$result_json = json_decode($raw_text, true);
if (!$result_json) {
    $clean_text = preg_replace('/```json|```/', '', $raw_text);
    $result_json = json_decode(trim($clean_text), true) ?: ['finalAnswer' => 'Sonuç hesaplandı.'];
}

echo json_encode($result_json, JSON_UNESCAPED_UNICODE);
