<?php

namespace App\Services;

abstract class AbstractService implements \App\Interfaces\ServicesInterface
{
    abstract public function getModelClass(): ?string;
    abstract public function getRequestClass(): ?string;
    abstract public function getDTOClass(): ?string;
}