const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* const ghpages = require('gh-pages'); */

const fs = require('fs');

/* const header = fs.readFileSync(__dirname + '/src/pages/header.html');
const footer = fs.readFileSync(__dirname + '/src/pages/footer.html'); */

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: ['./quiz-page/quiz.html'],
          hot: true,
          port: 5501,
          static: path.resolve(__dirname, 'src'),
        },
      };

/* ghpages.publish(
  'dist',
  {
    branch: 'birds',
    dest: 'birds',
  },
  function (err) {}
); */

module.exports = ({ develop }) => ({
  mode: develop ? 'development' : 'production',
  devtool: develop ? 'inline-source-map' : false,
  entry: {
    'intro-page/intro': path.resolve(__dirname, 'src/intro-page/intro.js'),
    'quiz-page/quiz': './src/quiz-page/quiz.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',

    assetModuleFilename: (pathData) => {
      let name = '';
      console.log(pathData.filename);
      if (pathData.filename.includes('icons')) {
        name = 'assets/icons/[name][ext]';
      }
      if (pathData.filename.includes('sounds')) name = 'assets/sounds/[name][ext]';
      if (pathData.filename.includes('images')) {
        name = 'assets/images/[name][ext]';
      }
      return name;
    },
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: develop ? ['style-loader', 'css-loader'] : [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ca]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {},
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'intro-page/index.html',
      title: 'SongBird Intro',
      template: './src/intro-page/index.html',
      favicon: './src/assets/icons/flavicon.png',
      chunks: ['intro-page/intro'],
    }),
    new HtmlWebpackPlugin({
      filename: 'quiz-page/quiz.html',
      title: 'SongBird Quiz',
      template: path.resolve(__dirname, 'src/quiz-page/quiz.html'),

      chunks: ['quiz-page/quiz'],
      favicon: './src/assets/icons/flavicon.png',
    }),
    new CleanWebpackPlugin(),
    /*  new CopyPlugin({
      patterns: [
        {      
        },
      ],
    }), */
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  ...devServer(develop),
});
