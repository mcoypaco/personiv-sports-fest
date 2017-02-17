<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use App\Events\ChangedTeam;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\ChangedTeam' => [
            'App\Listeners\EventListener',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        // Event::listen('changed.team', function($data){
        //   return $data;
        // });
    }
}
