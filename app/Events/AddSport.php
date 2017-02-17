<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class AddSport implements ShouldBroadcast
{
  use  InteractsWithSockets, SerializesModels;

  public $sport;

  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct($request)
  {
      $this->sport = $request;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return Channel|array
   */
  public function broadcastOn()
  {
      return ['add.sport'];
  }


}
