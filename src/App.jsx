import React, { useState, useEffect } from 'react';
import { sdk } from '@farcaster/frame-sdk';

const LAMP_ON = '/lamp-on.png';
const LAMP_OFF = '/lamp-off.png';

const ON_COPY = "when i get a big airdrop, i will never tell a soul. but there will be signs.";
const OFF_COPY = "one light off wont affect climate change, but it sure does make me feel better";

export default function App() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    sdk.actions.addFrame().catch(() => {
      // Optionally handle rejection, but proceed anyway
    });
  }, []);

  const handleToggle = () => setOn((prev) => !prev);

  const handleShare = async () => {
    const text = on ? ON_COPY : OFF_COPY;
    try {
      await sdk.actions.composeCast({ text });
    } catch (e) {
      // Optionally handle rejection
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: on ? '#fff' : '#000' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 32, fontWeight: 600, color: on ? '#000' : '#fff' }}>
          {on ? 'lamp on' : 'lamp off'}
        </span>
      </div>
      <img
        src={on ? LAMP_ON : LAMP_OFF}
        alt={on ? 'Lamp On' : 'Lamp Off'}
        style={{ width: 240, height: 320, objectFit: 'contain', cursor: 'pointer', transition: 'filter 0.2s' }}
        onClick={handleToggle}
        draggable={false}
      />
      <button
        onClick={handleShare}
        style={{ marginTop: 32, fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 18, padding: '10px 24px', borderRadius: 8, border: 'none', background: '#eee', color: '#333', cursor: 'pointer' }}
      >
        share lamp status
      </button>
    </div>
  );
} 