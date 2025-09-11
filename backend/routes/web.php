<?php

use Illuminate\Support\Facades\Route;
use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\GithubFlavoredMarkdownExtension;
use League\CommonMark\MarkdownConverter;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;

Route::get('/', function () {

        $content = file_get_contents(base_path('README.md'));
        
        // Create the environment
        $environment = new Environment();
        $environment->addExtension(new CommonMarkCoreExtension()); // Required for core Markdown support
        $environment->addExtension(new GithubFlavoredMarkdownExtension([
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]));

        // Criar o conversor
        $converter = new MarkdownConverter($environment);

        // Converter para HTML
        $html = $converter->convert($content);

        // $html = file_get_contents(base_path('README.md'));

    return view('welcome', [
        'readme' => $html,
    ]);
});

