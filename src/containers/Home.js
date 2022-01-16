import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  ToastAndroid,
} from 'react-native';
import * as Styles from '../styles/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Loading from '../components/Loading';
import { editDevice, getDevices, postFeedBack } from '../api';
import { useSelector } from 'react-redux';

const Home = () => {
  const [devices, setDevices] = useState([]);
  const [isVisibleDevice, setIsVisibleDevice] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState({});
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [des, setDes] = useState('');
  const user = useSelector(state => state.user);

  useEffect(() => {
    getDataDevice();
  }, []);

  const getDataDevice = () => {
    getDevices().then((response) => {
      const result = response.data;
      setDevices(result);
    })
  };
  const hideModalDevice = () => {
    setIsVisibleDevice(false);
  };
  const showModalDevice = () => {
    setIsVisibleDevice(true);
  };
  const onSelectItem = item => {
    hideModalDevice();
    setSelectedDevice(item);
  };
  const handleSend = () => {
    setLoading(true);
    const feedback = {
      mathietbi: selectedDevice.mathietbi,
      soluong: 1,
      thoigianphanhoi: new Date(),
      manguoidung: user.id,
      mota: des
    }
    try {
      postFeedBack(feedback).then(response => {
        setLoading(false);
        ToastAndroid.showWithGravity(
          'Gửi phản hồi thành công',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        setSelectedDevice({});
        setDes('');
        const edit = {
          mathietbi: selectedDevice.mathietbi, 
          tenthietbi: selectedDevice.tenthietbi, 
          dvt: selectedDevice.dvt,
          soluongsanco: selectedDevice.soluongsanco-= 1,
          soluong: selectedDevice.soluong,
          mota: selectedDevice.mota,
          cothesuachua: selectedDevice.cothesuachua,
          maloaithietbi: selectedDevice.maloaithietbi
        }
        editDevice(selectedDevice.mathietbi, edit);
      });
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Modal animationIn={'fadeIn'} isVisible={loading}>
        <Loading />
      </Modal>
      <ScrollView bounces={false}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Phản hồi tình trạng thiết bị</Text>
          <Text style={styles.normalText}>
            Mục dành cho nhân viên, giáo viên
          </Text>
        </View>
        <View style={styles.content}>
          {/* <TouchableOpacity style={[styles.textInput, styles.dropdown]}>
            <Text style={styles.placeholder}>Chọn phòng học</Text>
            <Ionicons name={'chevron-forward-outline'} size={15} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.textInput, styles.dropdown]}
            onPress={showModalDevice}>
            <Text
              style={selectedDevice ? styles.selectedText : styles.placeholder}>
              {selectedDevice.tenthietbi || 'Chọn thiết bị'}
            </Text>
            <Ionicons name={'chevron-forward-outline'} size={15} />
          </TouchableOpacity>
          <TextInput
            multiline
            value={des}
            onChangeText={text => setDes(text)}
            placeholder={'Mô tả tình trạng'}
            style={[styles.textInput, styles.multiline]}
          />
          <TouchableOpacity
            style={[styles.textInput, styles.submitBtn]}
            onPress={handleSend}>
            <Ionicons name={'paper-plane-outline'} size={20} color="#FFF" />
            <Text style={styles.submitBtnText}>Gửi phản hồi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        isVisible={isVisibleDevice}
        style={styles.modal}
        useNativeDriver
        animationIn={'fadeInUp'}
        animationOut={'fadeOut'}
        onBackdropPress={hideModalDevice}
        onBackButtonPress={hideModalDevice}>
        <View style={styles.modalContainer}>
          <Text style={styles.titleModal}>Danh sách thiết bị</Text>
          <TextInput
            placeholder="Tìm kiếm thiết bị"
            style={styles.inputSearch}
          />
          <FlatList
            data={devices}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => onSelectItem(item)}>
                <Text style={styles.itemModal}>{item.tenthietbi}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.COLORS.mainColor,
  },
  title: {
    backgroundColor: Styles.COLORS.mainColor,
    height: 200,
    padding: 15,
    justifyContent: 'flex-end',
  },
  titleText: {
    color: '#FFF',
    fontSize: 23,
    fontWeight: '600',
    marginBottom: 10,
  },
  normalText: {
    fontSize: 13,
    color: '#fff',
  },
  content: {
    height: 600,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    padding: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    padding: 20,
    backgroundColor: '#f2f3f7',
    borderRadius: 10,
    fontSize: 16,
    marginVertical: 10,
  },
  multiline: {
    height: 150,
    paddingTop: 20,
  },
  placeholder: {
    color: '#878b90',
    flex: 1,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: Styles.COLORS.mainColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 20,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '70%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
  },
  titleModal: {
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  inputSearch: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 10,
  },
  itemModal: {
    paddingVertical: 10,
    marginTop: 10,
  },
  selectedText: {
    color: '#000',
    flex: 1,
  },
});
