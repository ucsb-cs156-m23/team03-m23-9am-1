import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function MenuItemReviewForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    
    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker restore all
   
    const navigate = useNavigate();

    // Stryker disable next-line Regex
    const int_regex = /\d+/;
    // Stryker disable next-line Regex
    const email_regex = /\S+@\S+\.\S+/;
    // Stryker disable next-line Regex
    const stars_regex = /[1|2|3|4|5]/;
    // Stryker disable next-line Regex
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;


    const testIdPrefix = "MenuItemReviewForm";

   

    return (
        <Form onSubmit={handleSubmit(submitAction)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-id"}
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialContents.id}
                        disabled
                    />
                </Form.Group>
            )}

            
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="item-id">Item Id</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-item-id"}
                    id="item-id"
                    type="text"
                    isInvalid={Boolean(errors.itemId)}
                    {...register("itemId", {
                        required: "Item Id is required.",
                        pattern: {
                            value: int_regex,
                            message: "Item Id must be a number"
                        },
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.itemId?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="reviewer-email">Reviewer Email</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-reviewer-email"}
                    id="reviewer-email"
                    type="text"
                    isInvalid={Boolean(errors.reviewerEmail)}
                    {...register("reviewerEmail", {
                        required: "Reviewer Email is required.",
                        pattern: {
                            value: email_regex,
                            message: "Reviewer Email must be a valid email address"
                        },
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.reviewerEmail?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="stars">Stars</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-stars"}
                    id="stars"
                    type="text"
                    isInvalid={Boolean(errors.stars)}
                    {...register("stars", {
                        required: "Stars are required.",
                        pattern: {
                            value: stars_regex,
                            message: "Stars must be a number between 1 and 5"
                        },
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.stars?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="date-reviewed">Date Reviewed</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-date-reviewed"}
                    id="date-reviewed"
                    type="text"
                    isInvalid={Boolean(errors.dateReviewed)}
                    {...register("dateReviewed", {
                        required: "Date Reviewed is required.",
                        pattern: {
                            value: isodate_regex,
                            message: "Date Reviewed must be a valid date"
                        },
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateReviewed?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="comments">Comments</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-comments"}
                    id="comments"
                    type="text"
                    isInvalid={Boolean(errors.comments)}
                    {...register("comments", {
                        required: "Comments are required.",
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.comments?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid={testIdPrefix + "-submit"}
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid={testIdPrefix + "-cancel"}
            >
                Cancel
            </Button>

        </Form>

    )
}

export default MenuItemReviewForm;