import React from 'react';

interface ComposerProps {
  value?: string;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function Composer(props: ComposerProps) {
  return <input {...props} type="text" placeholder="Type in a message..." />;
}
