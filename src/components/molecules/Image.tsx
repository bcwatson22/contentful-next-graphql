import { ReactNode } from 'react';

interface IProps {
  image: IImage;
  queries: IQuery[];
  sizes?: string;
  classes?: string;
  children?: ReactNode;
}

const config = {
  formats: [
    'webp',
    'jpg'
  ],
  mobile: '(max-width: 749px)',
  portrait: '(min-width: 750px) and (max-width: 999px)',
  landscape: '(min-width: 1000px) and (max-width: 1299px)',
  desktop: '(min-width: 1300px)'
};

const placeholder = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

const Image = ({ image, queries, sizes, classes, children }: IProps) => {

  const { src, alt } = image;
  const { formats } = config;

  return (
    <picture className={classes ? classes : undefined}>
      {queries.map(query => {

        const { device, dimensions } = query;
        const { min, max } = dimensions;
        const { width: minWidth, height: minHeight } = min;
        const { width: maxWidth, height: maxHeight } = max;
        
        const crops: ICrop[] = [
          {
            width: minWidth,
            height: minHeight
          },
          {
            width: minWidth * 2,
            height: minHeight * 2
          }
        ];

        if (minWidth !== maxWidth) {

          crops.push(
            {
              width: maxWidth,
              height: maxHeight
            },
            {
              width: maxWidth * 2,
              height: maxHeight * 2
            }
          );

        }

        return (
          formats.map((format, j) => (
            <source key={`${device}-${j}`} 
              media={config[device]}
              data-srcset={crops.map(crop => `${src}${!src?.includes('?') ? '?mode=crop' : ''}&width=${crop.width}&height=${crop.height}&format=${format}&quality=${format === 'webp' ? 90 : 75} ${crop.width}w`)}
              type={`image/${format === 'jpg' ? 'jpeg' : format}`} />
          ))
        );

      })}
      <img src={placeholder}
        data-src={placeholder}
        sizes={sizes ? sizes : undefined} 
        alt={alt} 
        className="b-lazy" />
      { children && children }
    </picture>
  );

};

export default Image;
