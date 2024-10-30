import {makeScene2D, Rect, Txt, Layout, Circle, Img} from '@motion-canvas/2d';
import {beginSlide, createRef, waitFor, all, ThreadGenerator, easeOutCubic, linear} from '@motion-canvas/core';


export default makeScene2D(function* (view) {
  const title = createRef<Txt>();
  view.add(<Txt ref={title} x={0} y={-500}/>);

  const requestText = createRef<Txt>();
  const request = createRef<Rect>();
  const assistant = createRef<Rect>();
  const outputRect = createRef<Txt>();
  const outputTxt = createRef<Txt>();

  const gear1 = createRef<Img>();
  const gear2 = createRef<Img>();

  view.add(
    <Layout>
      <Rect ref={request} x={-700} y={0} width={450} height={250} 
            smoothCorners={true} radius={25}>
        <Txt ref={requestText} x={0} y={0} padding={25}/>
      </Rect>
      <Rect ref={assistant} x={0} y={0} width={250} height={400} fill={'#888888'} smoothCorners={true} radius={25}
            padding={25}>
        <Txt y={-100}>ChatGPT</Txt>
        <Img ref={gear1} src={"public/gear.svg"} width={120} x={-35} y={20} alpha={0}/>
        <Img ref={gear2} src={"public/gear.svg"} width={120} x={35} y={110} alpha={0}/>
      </Rect>
      <Rect ref={outputRect} x={550} y={0} width={750} height={950}
        smoothCorners={true} radius={25} fill={'#333333'} clip={true}
        opacity={0}>
          <Txt ref={outputTxt} padding={25} width={700} height={900}
              fontSize={16} clip={true} fill={"#ffffff"}></Txt>
      </Rect>
    </Layout>);

  title().text('Generic AI assistant');
  yield* beginSlide('normal AI request');
  yield* typeOut(requestText(), 'Write me a recipe\nto bake a key lime\npie', 0.05);
  yield* request().fill('#bbbbbb', 1);
  yield* request().scale(0.4, 1);
  yield* request().position.x(0, 1);
  yield* all(
    outputRect().opacity(1, 0.2),
    gear1().alpha(1, 0.2),
    gear2().alpha(1, 0.2),
    gear1().rotation(1000, 6, linear),
    gear2().rotation(-1000, 6, linear),
    typeAI(outputTxt(), 
`Here’s a delicious key lime pie recipe that balances the tartness of the limes with a\ncreamy filling and a buttery graham cracker crust. Perfect for any occasion!

Key Lime Pie Recipe
Ingredients
For the Crust:

1 ½ cups graham cracker crumbs (about 10-12 full sheets)
¼ cup granulated sugar
6 tablespoons unsalted butter, melted
For the Filling:

1 can (14 oz) sweetened condensed milk
½ cup key lime juice (freshly squeezed, about 15-20 key limes or bottled key lime juice)
1 tablespoon key lime zest (optional but adds great flavor)
4 large egg yolks
For the Whipped Cream Topping:

1 cup heavy whipping cream, chilled
2 tablespoons powdered sugar
1 teaspoon vanilla extract (optional)
Instructions
Preheat Oven: Preheat your oven to 350°F (175°C).

Prepare the Crust:

In a medium bowl, mix the graham cracker crumbs and sugar.
Add melted butter and stir until the crumbs are evenly coated.
Press the mixture firmly into the bottom and up the sides of a 9-inch pie dish to form the crust.
Bake the crust for about 10 minutes, then remove from oven and let it cool slightly while you prepare the filling.
Make the Filling:

In a mixing bowl, whisk the egg yolks until smooth. Gradually whisk in the sweetened condensed milk until well-combined.
Stir in the lime juice and zest until smooth.
Pour the filling into the pre-baked crust.
Bake the Pie:

Bake for 15-17 minutes, until the filling is set but slightly wobbly in the center.
Let the pie cool to room temperature, then refrigerate for at least 3 hours (or overnight) until fully chilled.
Prepare the Whipped Cream Topping:

In a chilled bowl, beat the heavy whipping cream, powdered sugar, and vanilla until stiff peaks form.
Serve:

Top the pie with whipped cream either as a whole layer or in dollops. Optionally, garnish with lime slices or zest for decoration.
Enjoy your homemade key lime pie! This recipe is sure to be a hit with its creamy texture and bright lime flavor.
`, 0.02));

    yield* beginSlide('end');

});

function* typeOut(txt: Txt, text: string, delay: number): ThreadGenerator {
  for(let n =0; n <= text.length; n++) {
      txt.text(text.substring(0, n));
      yield* waitFor(delay);
  }
}

function* typeAI(txt: Txt, text: string, delay: number): ThreadGenerator {
  let words = text.split(" ");
  for(let n =0; n <= words.length; n++) {
    txt.text(words.slice(0, n).join(" "));
    yield* waitFor(delay);
  }
}
