export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const buttonIndex = url.searchParams.get('buttonIndex');
  
  // Get the current state from the URL or default to true
  const currentState = url.searchParams.get('state') !== 'false';
  
  // Toggle the state
  const newState = !currentState;
  
  // Return the frame response
  return new Response(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="og:title" content="Lamp Miniapp" />
        <meta property="og:image" content="https://${url.hostname}/${newState ? 'lamp-on.png' : 'lamp-off.png'}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://${url.hostname}/${newState ? 'lamp-on.png' : 'lamp-off.png'}" />
        <meta property="fc:frame:button:1" content="Toggle Lamp" />
        <meta property="fc:frame:post_url" content="https://${url.hostname}/api/frame?state=${newState}" />
      </head>
    </html>
    `,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
} 