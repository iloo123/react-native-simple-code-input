#Installation: 
    yarn add react-native-simple-code-input
#Usage: 
    import PinCode from 'react-native-simple-code-input';

    <PinCode
        onFulFill={value => alert('value', value)}
        codeLength={8}
    />
