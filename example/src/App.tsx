import React from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  QuillEditor,
  QuillToolbar,
  type SelectionChangeData,
  type TextChangeData
} from 'react-native-scribe';

import { CustomContainer } from './CustomContainer';
import { customFonts } from './customFonts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const clockIcon = require('../assets/icons/clock.png');

const App = () => {
  const editor = React.useRef<QuillEditor>(null);
  const [disabled, setDisabled] = React.useState(false);

  const handleEnable = () => {
    editor.current?.enable(disabled);
    setDisabled(!disabled);
  };

  const handleGetHtml = () => {
    editor.current?.getHtml().then((html) => {
      console.log('Html :', html);
      Alert.alert(html);
    });
  }

  const handleSelectionChange = (data: SelectionChangeData) => {
    const { range } = data;
    if (range) {
      if (range.length === 0) {
        console.log('User cursor is at index', range.index);
      } else {
        const text = editor.current?.getText(range.index, range.length);
        console.log('Selected text:', text);
      }
    } else {
      console.log('Cursor is not in editor!');
    }
  }

  const handleTextChange = (data: TextChangeData) => {
    if (data.source === 'api') {
      console.log('An API call triggered this change.');
    } else if (data.source === 'user') {
      console.log('A user action triggered this change.');
    }
  }

  const handleHtmlChange = ({html}) => console.log(html);

  const customHandler = () => console.log('Custom handler');

  return (
    <SafeAreaView
      style={styles.root}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <QuillEditor
        ref={editor}
        webview={{ nestedScrollEnabled: true }}
        style={styles.editor}
        container={CustomContainer}
        onSelectionChange={handleSelectionChange}
        onTextChange={handleTextChange}
        onHtmlChange={handleHtmlChange}
        quill={{
          placeholder: 'Start typing...',
          modules: {
            toolbar: false  // This is the default value
          },
          theme: 'snow' // This is the default value
        }}
        // Extending Blots
        customJS={`
          const ListItem = Quill.import('formats/list/item');

          class PlainListItem extends ListItem {
            formatAt(index, length, name, value) {
              if (name === 'list') {
                // Allow changing or removing list format
                super.formatAt(name, value);
              }
                // Otherwise ignore
            }
          }

          Quill.register(PlainListItem, true);
        `}
        defaultFontFamily={customFonts[0].name}
        customFonts={customFonts}
        import3rdParties='cdn' // Default is local
        initialHtml="<h1>Quill Editor for react-native</h1><img src='https://picsum.photos/200/300'/><br/><p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>"
      />

      <View style={styles.buttons}>
        <Pressable style={styles.btn} onPress={handleEnable}>
          <Text>{disabled === true ? 'Enable' : 'Disable'}</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={handleGetHtml}>
          <Text>Html</Text>
        </Pressable>
      </View>

      <QuillToolbar
        editor={editor}
        theme={{
          background: '#f5f5f5',
          color: '#000',
          size: 30,
          overlay: 'rgba(0,0,0,0.1)',
        }}
        styles={{
          toolbar: {
            provider: (provided) => ({
              ...provided,
              borderTopWidth: 1,
            }),
            root: (provided) => ({
              ...provided,
              backgroundColor: 'slategray',
            }),
          },
        }}
        options={[
          ['bold', 'italic', 'underline'],
          [{ header: 1 }, { header: 2 }],
          [{ align: [] }],
          [
            { color: ['#000000', '#006000', '#600000', 'goldenrod'] },
            { background: [] },
          ],
          [{ font: ['', customFonts[1].name] }],
          ['image', 'clock']
        ]}
        custom={{
          handler: customHandler,
          actions: ['image', 'clock'],
          icons: {
            clock: clockIcon,
          }
        }}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 10,
    margin: 3,
  },
});

export default App;
