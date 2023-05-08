export const renderScreens = (Stack, screens) =>
  screens.map((screen, idx) => <Stack.Screen key={idx} {...screen} />);
