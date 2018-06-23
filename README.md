#Installation: 
    yarn add react-native-simple-code-input
#Usage: 
    import PinCode from 'react-native-simple-code-input';

    <PinCode
        onFulFill={value => alert('value', value)}
        codeLength={8}
    />

#ClearCode
    <PinCode
        ref={ref => this.pincode = ref}
        onFulFill={value => alert('value', value)}
        codeLength={8}
    />

    this.pincode.clearCode();

#Customize Code Component
    Developing...