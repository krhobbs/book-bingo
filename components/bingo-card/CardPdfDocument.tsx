/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  card: {
    flexGrow: 1,
    flexDirection: 'row',
    margin: '0px 10px 0px 10px',
    flexWrap: 'wrap',
    height: '95%',
  },
  square: {
    flex: '1 1 20%',
    flexDirection: 'column',
    width: 0,
    border: '1px solid black',
    height: '20%',
    padding: '4px 4px 8px 4px',
    justifyContent: 'space-between',
  },
});

const CardPdfDocument = ({ card }: { card: Card }) => (
  <Document>
    <Page size={['595.28', '941.89']} style={styles.page}>
      <View
        style={{ height: '4%', alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ textAlign: 'center', fontSize: '16px' }}>
          {card.template}
        </Text>
      </View>

      <View style={styles.card}>
        {card.squares.map((square) => {
          return (
            <View
              key={square.id}
              style={{
                ...styles.square,
                backgroundColor: square.book ? '#DCF0DA' : 'transparent',
              }}
            >
              <View style={{ flex: '1 1 25%' }}>
                <Text
                  style={{
                    fontSize: '10px',
                    textAlign: 'center',
                    fontWeight: 'extrabold',
                    marginBottom: '4px',
                  }}
                >
                  {square.req}
                </Text>
                {square?.book && (
                  <Text
                    style={{
                      fontSize: '9px',
                      textAlign: 'center',
                      marginBottom: '2px',
                    }}
                  >
                    {square.book.title}
                  </Text>
                )}
                {square?.book && (
                  <Text
                    style={{
                      fontSize: '8px',
                      marginBottom: '4px',
                      textAlign: 'center',
                    }}
                  >
                    {square.book.author}
                  </Text>
                )}
              </View>
              {/* H 175 : W 115 */}
              <View>
                {square?.book?.cover && (
                  <Image
                    style={{
                      height: '115.5px',
                      margin: '0 auto',
                      objectFit: 'cover',
                      width: '75.9px',
                    }}
                    src={square.book.cover}
                  />
                )}
              </View>
            </View>
          );
        })}
      </View>
    </Page>
  </Document>
);

export default CardPdfDocument;
