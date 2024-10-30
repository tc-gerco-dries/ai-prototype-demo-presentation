import {makeScene2D, Rect, Txt, Layout, Code, Img} from '@motion-canvas/2d';
import {beginSlide, createRef, waitFor, all, chain, ThreadGenerator, linear, 
    slideTransition, Direction, makeRef, range, tween, loop
} 
  from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const title = createRef<Txt>();
  view.add(<Txt ref={title} x={0} y={-500}/>);

  const twigGenerator = createRef<Rect>();
  const twigGeneratorSystemInstructionsRect = createRef<Rect>();
  const twigGeneratorSystemInstructions = createRef<Txt>();
  const twigGeneratorDatabase = createRef<Img>();
  const twigGeneratorMagnifier = createRef<Img>();

  const twigValidator = createRef<Rect>();
  const twigValidatorSystemInstructionsRect = createRef<Rect>();
  const twigValidatorSystemInstructions = createRef<Txt>();
  const twigValidatorGear1 = createRef<Img>();
  const twigValidatorGear2 = createRef<Img>();

  const outputRect = createRef<Rect>();
  const outputCode = createRef<Code>();

  yield* slideTransition(Direction.Right);

  view.add(
    <Layout>
      <Rect ref={twigGenerator} x={0} y={-250} width={250} height={400} fill={'#888888'} 
            smoothCorners={true} radius={25} padding={25}>
        <Txt y={-140}>Generator</Txt>
        <Rect layout ref={twigGeneratorSystemInstructionsRect} y={-50} width={220} height={100} fill={"#bbbbbb"} padding={25}>
          <Txt ref={twigGeneratorSystemInstructions} textWrap={true}/>
        </Rect>
        <Img ref={twigGeneratorDatabase} src="public/database.svg" width={130} x={0} y={100} opacity={0}/>
        <Img ref={twigGeneratorMagnifier} src="public/magnifying-glass.svg" width={100} x={0} y={100} opacity={0}/>
      </Rect>
      <Rect ref={twigValidator} x={0} y={250} width={250} height={400} fill={'#888888'}
            smoothCorners={true} radius={25} padding={25}>
        <Txt y={-140}>Validator</Txt>
        <Rect layout ref={twigValidatorSystemInstructionsRect} y={-50} width={220} height={100} fill={"#bbbbbb"} padding={25}>
          <Txt ref={twigValidatorSystemInstructions} textWrap={true} fontSize={43}/>
        </Rect>
        <Img ref={twigValidatorGear1} src={"public/gear.svg"} width={90} x={-35} y={70} alpha={0}/>
        <Img ref={twigValidatorGear2} src={"public/gear.svg"} width={90} x={35} y={130} alpha={0}/>
      </Rect>
      <Rect layout ref={outputRect} x={550} y={0} width={750} height={950}
        smoothCorners={true} radius={25} padding={25} fill={'#333333'} clip={true} opacity={0}>
          <Code ref={outputCode} width={700} height={900}
              fontSize={16} clip={true}></Code>
      </Rect>
    </Layout>);

  title().text('Custom AI assistants');
  yield* beginSlide('Show twig generator system instructions');
  yield* all(
    twigGeneratorSystemInstructionsRect().position([-550, 250], 1),
    twigGeneratorSystemInstructionsRect().size([600, 800], 1)
  );
  yield* typeOut(twigGeneratorSystemInstructions(), `You are an AI assistant specialized in transforming input data into DTD-compliant cXML invoices using TWIG templates. Your primary objective is to generate a TWIG template that accurately converts the user's input data into a valid cXML invoice.`, 0.02)

  yield* beginSlide('Hide generator system instructions');
  yield* all(
    twigGeneratorSystemInstructionsRect().position([0, -50], 1),
    twigGeneratorSystemInstructionsRect().size([220, 100], 1),
    twigGeneratorSystemInstructions().fontSize(8, 1)
  );

  yield* beginSlide("Show generator database");
  const files: Img[] = [];
  view.add(
    <Layout>
      {range(35).map(index => (
        <Img ref={makeRef(files, index)} 
          src="public/file-code.svg"
          width={50} 
          x={(index % 5) * 100 - 800}
          y={Math.floor(index / 5) * 100 - 300}
          opacity={0}
          />
      ))}
    </Layout>);
  yield* all(...files.map((val: Img, index: number) => {
    return chain(
      waitFor(Math.random()),
      val.opacity(1, 0.2)
    );
  }));

  yield* beginSlide("Move files to database");
  yield* twigGeneratorDatabase().opacity(1, 0.5);
  yield* all(...files.map((val: Img, index: number) => {
    return chain(
      waitFor(Math.random()),
      val.absolutePosition(twigGeneratorDatabase().absolutePosition(), 0.5),
      val.opacity(0, 0)
    );
  }));

  yield* beginSlide('Show validator system instructions');
  yield* all(
    twigValidatorSystemInstructionsRect().position([-550, -250], 1),
    twigValidatorSystemInstructionsRect().size([600, 800], 1)
  );
  yield* typeOut(twigValidatorSystemInstructions(), `You are a highly skilled assistant with deep expertise in analyzing, validating, and optimizing TWIG templates for cXML invoice generation. Your primary task is to take a TWIG template output from another LLM assistant, validate it for correctness, fix any issues, and provide a structured explanation of the changes you made and why.`, 0.02)

  yield* beginSlide('Hide validator system instructions');
  yield* all(
    twigValidatorSystemInstructionsRect().position([0, -50], 1),
    twigValidatorSystemInstructionsRect().size([220, 100], 1),
    twigValidatorSystemInstructions().fontSize(7, 1)
  );

  yield* beginSlide('Show input');

  const inputRect = createRef<Rect>();
  const inputCode = createRef<Code>();
  view.add(
    <Rect layout ref={inputRect} x={-600} y={0} width={600} height={800} 
      fill={"#333333"} smoothCorners={true} radius={25} padding={25} opacity={0}>
      <Code ref={inputCode} fontSize={8} textWrap={"pre"}></Code>
    </Rect>
  );
  inputCode().code(`{
  "apikey": "ABCD1234efgh5678.IJKL9012mnopq",
  "params": {
    "order_request_id": 12345678,
    "confirmation": {
      "header": {
        "ext_notice_id": "POACK-789",
        "notice_date": "2022-11-18",
        "po_payload_id": "93369535150910.10.57.136",
        "po_order_id": "PO-123",
        "po_order_date": "2022-11-01",
        "confirmation_status": "accept",
        "ship_to": {
          "address_id": "TN.04",
          "address_name": "Test Corp. - Nashville Branch",
          "deliver_to": "John Doe",
          "street": "123 Test St.",
          "city": "Nashville",
          "state": "TN",
          "postalcode": "37011",
          "country": "United States",
          "country_code": "US",
          "email": "johndoe@buyer.com",
          "phone": "888-555-9876",
          "data": {}
        },
        "bill_to": {
          "address_id": "TN.04",
          "address_name": "Test Corp. - Nashville Branch",
          "deliver_to": "John Doe",
          "street": "123 Test St.",
          "city": "Nashville",
          "state": "TN",
          "postalcode": "37011",
          "country": "United States",
          "country_code": "US",
          "email": "johndoe@buyer.com",
          "phone": "888-555-9876",
          "data": {}
        },
        "contact": {
          "email": "jdoe@testbuyer.com",
          "name": "John Doe"
        },
        "data": {}
      },
      "items": [
        {
          "currency": "USD",
          "_position": 1,
          "line_number": "101",
          "quantity": 2,
          "part_id": "45L017",
          "uom": "EA",
          "po_line_number": "101",
          "description": "Low Arc Kitchen Faucet: Dominion Faucets, Silver, Chrome Finish, 1.75 gpm Flow Rate, CEC Compliant",
          "unitprice": 41.15,
          "classification": "56101720",
          "comments": "This product is subject to a per-item packing fee for quantities less than 50.",
          "discount": 0,
          "discount_title": "Volume discount; 5% discount on quantities of ten or more.",
          "shipping": 0,
          "shipping_title": "FedEx 2Day",
          "tax": 0,
          "tax_rate": null,
          "tax_title": null,
          "row_total": 86.8,
          "confirmation_status": {
            "quantity": 1,
            "type": "accept",
            "shipment_date": "2022-01-01",
            "uom": "EA",
            "comments": null
          },
          "data": {}
        }
      ],
      "details": {
        "total": 103.97,
        "subtotal": 85.33,
        "currency": "USD",
        "shipping": 10.09,
        "shipping_title": "FedEx 2Day",
        "tax": 8.64,
        "tax_title": "Sales tax - 7% Tennessee"
      }
    }
  }
}`);

  yield* inputRect().opacity(1, 0.5);
  inputRect().moveToBottom();

  yield* beginSlide("Send input to generator");
  yield* inputRect().scale(0.25, 1);
  yield* inputRect().position(twigGenerator().position(), 1);
  yield* outputRect().opacity(1, 0.2);
  yield* waitFor(0.5);
  yield* all(
    twigGeneratorMagnifier().opacity(1, 0.2),
    searchAnim(twigGeneratorMagnifier(), 4),
    typeAI(outputCode(),
`{% set confirmation = params.confirmation %}
{% set header = confirmation.header %}
{% set items = confirmation.items %}
{% set details = confirmation.details %}
{% set timestamp = "now" | date('c') %}
{% set payloadid = 'POACK_' ~ "now" | date('Ymdhisu') ~ '@example.com' %}

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.021/InvoiceDetail.dtd">
<cXML payloadID="{{ payloadid }}" timestamp="{{ timestamp }}" version="1.2.021">
    <Header>
        <From>
            <Credential domain="{{ apikey | split('.') | last }}">
                <Identity>{{ apikey }}</Identity>
            </Credential>
        </From>
        <To>
            <Credential domain="{{ apikey | split('.') | last }}">
                <Identity>{{ apikey }}</Identity>
            </Credential>
        </To>
        <Sender>
            <Credential domain="{{ apikey | split('.') | last }}">
                <Identity>{{ apikey }}</Identity>
                <SharedSecret>{{ apikey }}</SharedSecret>
            </Credential>
            <UserAgent>ExampleAgent</UserAgent>
        </Sender>
    </Header>
    <Request>
        <ConfirmationRequest noticeDate="{{ header.notice_date }}" noticeType="{{ header.confirmation_status }}">
            <OrderReference orderID="{{ header.po_order_id }}" orderDate="{{ header.po_order_date }}">
                <DocumentReference payloadID="{{ header.po_payload_id }}" />
            </OrderReference>
            <ShipTo>
                <Contact>
                    <Name xml:lang="en">{{ header.ship_to.deliver_to }}</Name>
                    <PostalAddress>
                        <Street>{{ header.ship_to.street }}</Street>
                        <City>{{ header.ship_to.city }}</City>
                        <State>{{ header.ship_to.state }}</State>
                        <PostalCode>{{ header.ship_to.postalcode }}</PostalCode>
                        <Country isoCountryCode="{{ header.ship_to.country_code }}">{{ header.ship_to.country }}</Country>
                    </PostalAddress>
                    <Email>{{ header.ship_to.email }}</Email>
                    <Phone>{{ header.ship_to.phone }}</Phone>
                </Contact>`, 0.005)
  );
  yield* twigGeneratorMagnifier().opacity(0, 0.5);

  yield* beginSlide("Send template to validator");
  outputRect().moveToBottom();
  yield* outputRect().scale(0.2, 1);
  yield* outputRect().position(twigValidator().position(), 1);

  outputRect().position([550, 0]);
  outputRect().size([750, 950]);
  outputRect().scale(1);
  outputRect().opacity(0);
  outputCode().code("");

  yield* outputRect().opacity(1, 0.2);
  yield* waitFor(0.5);
  yield* all(
    twigValidatorGear1().alpha(1, 0.2),
    twigValidatorGear2().alpha(1, 0.2),
    twigValidatorGear1().rotation(1000, 4, linear),
    twigValidatorGear2().rotation(-1000, 4, linear),
    typeAI(outputCode(),
`{% set confirmation = params.confirmation %}
{% set header = confirmation.header %}
{% set items = confirmation.items %}
{% set details = confirmation.details %}
{% set timestamp = "now" | date('c') %}
{% set payloadid = 'POACK_' ~ "now" | date('Ymdhisu') ~ '@example.com' %}

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.021/InvoiceDetail.dtd">
<cXML payloadID="{{ payloadid }}" timestamp="{{ timestamp }}" version="1.2.021">
    <Header>
        <From>
            <Credential domain="{{ apikey | split('.') | last }}">
                <Identity>{{ apikey }}</Identity>
            </Credential>
        </From>
        <To>
            <Credential domain="{{ apikey | split('.') | last }}">
                <Identity>{{ apikey }}</Identity>
            </Credential>
        </To>
        <Sender>
            <Credential domain="{{ apikey | split('.') | last }}">
                <Identity>{{ apikey }}</Identity>
                <SharedSecret>{{ apikey }}</SharedSecret>
            </Credential>
            <UserAgent>ExampleAgent</UserAgent>
        </Sender>
    </Header>
    <Request>
        <ConfirmationRequest noticeDate="{{ header.notice_date }}" noticeType="{{ header.confirmation_status }}">
            <OrderReference orderID="{{ header.po_order_id }}" orderDate="{{ header.po_order_date }}">
                <DocumentReference payloadID="{{ header.po_payload_id }}" />
            </OrderReference>
            <ShipTo>
                <Contact>
                    <Name xml:lang="en">{{ header.ship_to.deliver_to }}</Name>
                    <PostalAddress>
                        <Street>{{ header.ship_to.street }}</Street>
                        <City>{{ header.ship_to.city }}</City>
                        <State>{{ header.ship_to.state }}</State>
                        <PostalCode>{{ header.ship_to.postalcode }}</PostalCode>
                        <Country isoCountryCode="{{ header.ship_to.country_code }}">{{ header.ship_to.country }}</Country>
                    </PostalAddress>
                    <Email>{{ header.ship_to.email }}</Email>
                    <Phone>{{ header.ship_to.phone }}</Phone>
                </Contact>`, 0.005)
  );

  yield* beginSlide('end');

});

function* searchAnim(img: Img, duration: number): ThreadGenerator {
  const initialPosition = img.position();
  const circleRadius = 50;
  yield* loop(duration, () => tween(1, value => {
    img.position.x(initialPosition.x - (Math.sin(value * Math.PI * 2) * circleRadius));
    img.position.y(initialPosition.y - (Math.cos(value * Math.PI * 2) * circleRadius));
  }));
}

function* typeOut(txt: Txt, text: string, delay: number): ThreadGenerator {
  for(let n =0; n <= text.length; n++) {
      txt.text(text.substring(0, n));
      yield* waitFor(delay);
  }
}

function* typeAI(code: Code, text: string, delay: number): ThreadGenerator {
  let words = text.split(" ");
  for(let n =0; n <= words.length; n++) {
    code.code(words.slice(0, n).join(" "));
    yield* waitFor(delay);
  }
}
