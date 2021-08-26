import React, { useRef } from 'react';
import SignatureScreen, {
  SignatureViewRef,
} from 'react-native-signature-canvas';

interface Props {
  onOK: (signature: string) => void;
  clearSignature: () => void;
}

export const Sign: React.FC<Props> = ({ onOK, clearSignature }) => {
  const ref = useRef<SignatureViewRef>(null);

  const style = `.m-signature-pad {box-shadow: none; position: absolute; border: 1px solid #C2C2C2; }
  .m-signature-pad--footer
  .button.clear {
    left: 0;
  } 
              .m-signature-pad--body {border: none;}
              .m-signature-pad--footer {
                position: absolute;
                left: -15px;
                right: 0px;
                bottom: 0px;
                height: 40px;
              }
              .m-signature-pad--footer
  .button {
      left:0px;    
    background-color: #ffffff;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #f44336;
    border: 2px solid #f44336;
  }
  .m-signature-pad--footer
  .button.clear {
    left: 0;
  }
  .m-signature-pad--footer
  .button.save {
    display:none
  }
`;

  const handleSignature = (signature: string) => {
    onOK(signature);
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  const handleClear = () => {
    clearSignature();
    console.log('clear success!');
  };

  const handleEnd = () => {
    ref.current?.readSignature();
  };

  return (
    <SignatureScreen
      ref={ref}
      onEnd={handleEnd}
      onOK={handleSignature}
      onEmpty={handleEmpty}
      onClear={handleClear}
      webStyle={style}
      autoClear={false}
      descriptionText={''}
      clearText={'Borrar'}
    />
  );
};
