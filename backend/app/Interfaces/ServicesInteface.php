<?php

namespace App\Interfaces;

interface ServicesInterface
{
    public function getDTOClass(): ?string;

    public function getModelClass(): ?string;

    public function getRequestClass(): ?string;
}
