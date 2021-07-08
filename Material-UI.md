# Demonstration from AutoComplete 

https://material-ui.com/components/autocomplete/#virtualization

```ts
                                                👇
const ListboxComponent = React.forwardRef<HTMLDivElement>(
  function ListboxComponent(props, ref) {
    const { children, ...other } = props;
                                        👇
    const itemData = React.Children.toArray(children);
    const theme = useTheme();
                        👇
    const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child: React.ReactNode) => {
                                                👇
      if (React.isValidElement(child) && child.type === ListSubheader) {
        return 48;
      }

      return itemSize;
    };

```

