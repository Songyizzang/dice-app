import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import React, {Component} from 'react';

import {Header} from './components/Header';
import styles from './components/styles';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,

      product_type: props.navigation.getParam('type', null),
      obj: props.navigation.getParam('obj', null),

      product_id: props.navigation.getParam('obj', null)?.product_id,

      common_brand: props.navigation.getParam('obj', null)?.common_brand,
      common_category: props.navigation.getParam('obj', null)?.common_category,
      common_name: props.navigation.getParam('obj', null)?.common_name,
      common_price: props.navigation
        .getParam('obj', null)
        ?.common_price?.toString(),
      common_capacity: props.navigation
        .getParam('obj', null)
        ?.common_capacity?.toString(),
      common_unit: props.navigation.getParam('obj', null)?.common_unit,
      common_displayType: props.navigation.getParam('obj', null)
        ?.common_displayType,

      beef_part: props.navigation.getParam('obj', null)?.beef_part,
      beef_pricePerUnitWeight: props.navigation
        .getParam('obj', null)
        ?.beef_pricePerUnitWeight?.toString(),
      beef_origin: props.navigation.getParam('obj', null)?.beef_origin,
      beef_usage: props.navigation.getParam('obj', null)?.beef_usage,
      beef_identificationNum: props.navigation
        .getParam('obj', null)
        ?.beef_identificationNum?.toString(),
      beef_rate: props.navigation.getParam('obj', null)?.beef_rate,

      wine_brand: props.navigation.getParam('obj', null)?.wine_brand,
      wine_name: props.navigation.getParam('obj', null)?.wine_name,
      wine_price: props.navigation
        .getParam('obj', null)
        ?.wine_price?.toString(),
      wine_capacity: props.navigation
        .getParam('obj', null)
        ?.wine_capacity?.toString(),
      wine_origin: props.navigation.getParam('obj', null)?.wine_origin,
      wine_sugarContent: props.navigation
        .getParam('obj', null)
        ?.wine_sugarContent?.toString(),
      wine_frequency: props.navigation
        .getParam('obj', null)
        ?.wine_frequency?.toString(),
    };
  }

  _editProduct = async () => {
    const {
      product_id,

      product_type,

      common_brand,
      common_category,
      common_name,
      common_price,
      common_capacity,
      common_unit,
      common_displayType,

      beef_part,
      beef_pricePerUnitWeight,
      beef_origin,
      beef_usage,
      beef_identificationNum,
      beef_rate,

      wine_brand,
      wine_name,
      wine_price,
      wine_capacity,
      wine_origin,
      wine_sugarContent,
      wine_frequency,
    } = this.state;

    try {
      const response = await fetch(
        'https://biw4gdguia.execute-api.ap-northeast-2.amazonaws.com/default/dice-allproduct',
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body:
            product_type === 'common'
              ? `product_id=${product_id}&product_type=${product_type}&common_brand=${common_brand}&common_name=${common_name}&common_price=${common_price}&common_capacity=${common_capacity}&common_unit=${common_unit}&common_displayType=${common_displayType}&common_category=${common_category}`
              : product_type === 'beef'
              ? `product_type=${product_type}&beef_part=${beef_part}&beef_pricePerUnitWeight=${beef_pricePerUnitWeight}&beef_origin=${beef_origin}&beef_usage=${beef_usage}&beef_identificationNum=${beef_identificationNum}&beef_rate=${beef_rate}`
              : `product_type=${product_type}&wine_brand=${wine_brand}&wine_name=${wine_name}&wine_price=${wine_price}&wine_capacity=${wine_capacity}&wine_origin=${wine_origin}&wine_sugarContent=${wine_sugarContent}&wine_frequency=${wine_frequency}`,
        },
      );
      const responseJson = await response.json();
      if (responseJson?.isSuccess) {
        this.props.navigation.navigate('Home');
      } else {
        Alert.alert('알림', '다시 시도해주세요!');
      }
    } catch (err) {
      console.log('err in _setEpaperInfo');
      console.log(err);
    }
  };

  render() {
    const {product_type, obj} = this.state;
    console.log('obj');
    console.log(obj);
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header onPress={() => this.props.navigation.goBack()} />
        {product_type === 'common' && this._renderCommonAdd()}
        {product_type === 'beef' && this._renderBeefAdd()}
        {product_type === 'wine' && this._renderWineAdd()}
      </SafeAreaView>
    );
  }

  _renderCommonAdd = () => {
    const {
      product_id,
      common_brand,
      common_category,
      common_name,
      common_price,
      common_capacity,
      common_unit,
      common_displayType,
    } = this.state;
    return (
      <View style={{flex: 1, padding: 15, marginLeft: 20, marginRight: 20}}>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>product_id</Text>
          <Text style={styles.textInput}>{product_id}</Text>
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>브랜드</Text>
          <TextInput
            onChangeText={value => this.setState({common_brand: value})}
            value={common_brand}
            style={styles.textInput}
          />
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>카테고리</Text>
          <TextInput
            onChangeText={value => this.setState({common_category: value})}
            value={common_category}
            style={styles.textInput}
          />
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>상품명</Text>
          <TextInput
            onChangeText={value => this.setState({common_name: value})}
            value={common_name}
            style={styles.textInput}
          />
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>가격</Text>
          <TextInput
            onChangeText={value => this.setState({common_price: value})}
            value={common_price}
            style={styles.textInput}
          />
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>용량</Text>
          <TextInput
            onChangeText={value => this.setState({common_capacity: value})}
            value={common_capacity}
            style={styles.textInput}
          />
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>단위</Text>
          <TextInput
            onChangeText={value => this.setState({common_unit: value})}
            value={common_unit}
            style={styles.textInput}
          />
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>디스플레이타입</Text>
          <TextInput
            onChangeText={value => this.setState({common_displayType: value})}
            value={common_displayType}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity
          style={{
            width: 200,
            height: 30,
            borderRadius: 20,
            backgroundColor: '#0EADFF',
            justifyContent: 'center',
            marginTop: 10,
            alignSelf: 'center',
          }}
          onPress={() => this._editProduct()}>
          <Text style={{color: 'white', textAlign: 'center'}}>수정</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderBeefAdd = () => {
    const {
      product_id,
      beef_part,
      beef_pricePerUnitWeight,
      beef_origin,
      beef_usage,
      beef_identificationNum,
      beef_rate,
    } = this.state;
    return (
      <View style={{flex: 1, padding: 15, marginLeft: 20, marginRight: 20}}>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>product_id</Text>
          <Text>{product_id}</Text>
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>beef 부위</Text>
          <TextInput
            onChangeText={value => this.setState({beef_part: value})}
            value={beef_part}
            style={styles.textInput}
          />
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>단위별 가격</Text>
          <TextInput
            onChangeText={value =>
              this.setState({beef_pricePerUnitWeight: value})
            }
            value={beef_pricePerUnitWeight}
            style={styles.textInput}
          />
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>원산지</Text>
          <TextInput
            onChangeText={value => this.setState({beef_origin: value})}
            value={beef_origin}
            style={styles.textInput}
          />
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>용도</Text>
          <TextInput
            onChangeText={value => this.setState({beef_usage: value})}
            value={beef_usage}
            style={styles.textInput}
          />
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>식별번호</Text>
          <TextInput
            onChangeText={value =>
              this.setState({beef_identificationNum: value})
            }
            value={beef_identificationNum}
            style={styles.textInput}
          />
        </View>
        <View style={styles.wrapper4}>
          <Text style={styles.text3}>등급</Text>
          <TextInput
            onChangeText={value => this.setState({beef_rate: value})}
            value={beef_rate}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity onPress={() => this._editProduct()}>
          <Text>등록</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderWineAdd = () => {
    const {
      product_id,
      wine_brand,
      wine_name,
      wine_price,
      wine_capacity,
      wine_origin,
      wine_sugarContent,
      wine_frequency,
    } = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginRight: 5}}>product_id</Text>
          <Text>{product_id}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>wine 브랜드</Text>
          <TextInput
            onChangeText={value => this.setState({wine_brand: value})}
            value={wine_brand}
            style={{
              width: 100,
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>상품명</Text>
          <TextInput
            onChangeText={value => this.setState({wine_name: value})}
            value={wine_name}
            style={{
              width: 100,
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>가격</Text>
          <TextInput
            onChangeText={value => this.setState({wine_price: value})}
            value={wine_price}
            style={{
              width: 100,
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>용량</Text>
          <TextInput
            onChangeText={value => this.setState({wine_capacity: value})}
            value={wine_capacity}
            style={{
              width: 100,
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>원산지</Text>
          <TextInput
            onChangeText={value => this.setState({wine_origin: value})}
            value={wine_origin}
            style={{
              width: 100,
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>당도</Text>
          <TextInput
            onChangeText={value => this.setState({wine_sugarContent: value})}
            value={wine_sugarContent}
            style={{
              width: 100,
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>도수</Text>
          <TextInput
            onChangeText={value => this.setState({wine_frequency: value})}
            value={wine_frequency}
            style={{
              width: 100,
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            }}
          />
        </View>
        <TouchableOpacity onPress={() => this._editProduct()}>
          <Text>등록</Text>
        </TouchableOpacity>
      </View>
    );
  };
}

export default Edit;
