export default async function handler(req, res) {
  const { state } = req.query;
  const currentState = state !== 'false';
  const newState = !currentState;
  
  // Return the frame response
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="og:title" content="Lamp" />
        <meta property="og:description" content="A simple lamp like the one in the office. Share your lamp status with the world!" />
        <meta property="og:image" content="https://${req.headers.host}/${newState ? 'lamp-on.png' : 'lamp-off.png'}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://${req.headers.host}/${newState ? 'lamp-on.png' : 'lamp-off.png'}" />
        <meta property="fc:frame:button:1" content="Toggle Lamp" />
        <meta property="fc:frame:post_url" content="https://${req.headers.host}/api/frame?state=${newState}" />
      </head>
    </html>
  `);
} 