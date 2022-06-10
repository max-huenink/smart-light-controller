import { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Power } from 'react-bootstrap-icons';
import OnOffTrait from '../models/traits/OnOffTrait';

export default function LightOnOff({ On }: OnOffTrait) {
  return (<>
    <Button variant={On ? 'success' : 'danger'}>
      <Power />
    </Button>
    {On ? "On" : "Off"}
  </>);
}