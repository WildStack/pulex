/**
 *
 * @example
 * classNames('foo', 'bar') // => 'foo bar'
 * classNames('foo', { bar: true }) // => 'foo bar'
 * classNames({ 'foo-bar': true }) // => 'foo-bar'
 * classNames({ 'foo-bar': false }) // => ''
 * classNames({ foo: true }, { bar: true }) // => 'foo bar'
 * classNames({ foo: true, bar: true }) // => 'foo bar'
 * classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }) // => 'foo bar baz quux'
 * classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '') // => 'bar 1'
 */
export const classNames = (
  ...args: (string | { [className: string]: boolean } | boolean | undefined | null)[]
): string => {
  const classes: string[] = [];

  args.forEach(arg => {
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object' && arg !== null) {
      Object.keys(arg).forEach(key => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(' ');
};
