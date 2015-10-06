@extends('frontend.layout')

@section('content')

<ul>
<?php $pnum = 0; ?>
@foreach($characters as $pid => $character)
  <li>{{ $character['name'] }}</li>
<?php $pnum ++; ?>
@endforeach
<?php unset($pnum); ?>


</ul>@stop

