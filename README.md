**Installation**:   
    yarn add react-native-simple-code-input  
    
**Usage**:  
    #import PinCode from 'react-native-simple-code-input';  

    <PinCode
        onFulFill={value => alert('value', value)}
        length={8}
    />

**ClearCode**
    <PinCode
        ref={ref => this.pincode = ref}
        onFulFill={value => alert('value', value)}
        length={8}
    />

    this.pincode.clearCode();

**Customize Code Component**
    <PinCode
        ref={ref => this.pincode = ref }
        onFulFill={value => console.log('input value', value)}
        length={8}
        onChangeText={value => console.log('input value', value)}
        cuztomize
        renderValueComponent={value => <Text red>{value}</Text>}
        renderEmptyComponent={value => <Text red>x</Text>}
    />  

    <Text onPress={() => this.pincode && this.pincode.clearCode()}>Clear</Text>  